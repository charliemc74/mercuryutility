using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
        public class AccountController : BaseApiController
        {
            private readonly ILogger<AccountController> _logger;
            private readonly DataContext _context;

            private readonly ITokenService _tokenService;

            public AccountController(ILogger<AccountController> logger, DataContext context, ITokenService tService)
            {
                _logger = logger;
                _context = context;
                _tokenService = tService;
            }                

            
            [HttpPost("register")]
            public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)            
            {
                using var hmac = new HMACSHA512();
                
                if( await UserExists(registerDto.UserName))
                {
                     return BadRequest("Username is taken.");
                }else{
                    var user = new AppUser {
                        UserName = registerDto.UserName.ToLower(),
                        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                        PasswordSalt = hmac.Key
                    };
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    var userDto = new UserDto{
                        UserName = user.UserName,
                        Token = _tokenService.CreateToken(user)
                    }; 

                    return Ok(userDto);
                }
            }

            
            [HttpPost("login")]
            public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)            
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.UserName.ToLower());

                if(user == null)
                {
                     return Unauthorized("User does not exist");
                }else{
                    using var hmac = new HMACSHA512(user.PasswordSalt);

                    var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                    for(int i=0; i < computedHash.Length; i++)
                    {
                        if(computedHash[i] != user.PasswordHash[i])
                        {
                            return Unauthorized("Invalid password provided");
                        }
                    }        

                    var userDto = new UserDto{
                        UserName = user.UserName,
                        Token = _tokenService.CreateToken(user)
                    }; 

                    return Ok(userDto);
                }
            }

            private async Task<bool> UserExists(string uName)
            {
                return await _context.Users.AnyAsync(u => u.UserName == uName.ToLower());                
            }
        }
}