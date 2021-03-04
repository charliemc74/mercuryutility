using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Data;
using API.entities;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(ILogger<UsersController> logger, IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var usersDto = await _userRepository.GetMembersAsync();            
            return Ok(usersDto);
        }

        [HttpGet("{username}")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var userDto = await _userRepository.GetMemberByUsernameAsync(username);
            if (userDto != null)            
            {                
                return Ok(userDto);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
