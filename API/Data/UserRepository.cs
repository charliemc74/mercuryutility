using System.Collections.Generic;
using System.Threading.Tasks;
using API.entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.DTOs;
using System.Linq;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberByUsernameAsync(string username)
        {
            var user = await _context.Users
                    .Where(u => u.UserName.ToLower() == username.ToLower())
                    .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)                         
                    .SingleOrDefaultAsync();
            if(user != null && user.PhotoUrl == null)
            {
                user.PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain == true).Url;
            }
            return user;
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            var users = await _context.Users
                         .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)                         
                         .ToListAsync();
            foreach(var user in users)
            {
                if(user.PhotoUrl == null)
                {
                    user.PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain == true).Url;
                }
            }
            return users;             
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}