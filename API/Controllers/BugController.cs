using API.Data;
using API.entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class BugController : BaseApiController
    {
            private readonly ILogger<BugController> _logger;
            private readonly DataContext _context;

            public BugController(ILogger<BugController> logger, DataContext context)
            {
                _logger = logger;
                _context = context;
            }               

            [Authorize]
            [HttpGet("auth")]
            public ActionResult<string> Authorize()
            {
               return StatusCode(401, "Unauthorized");
            } 

            [HttpGet("not-found")]
            public ActionResult<AppUser> GetNotFound()
            {
                var thing = _context.Users.Find(-1);
                if(thing == null){
                    return NotFound();
                }else{
                    return Ok(thing);
                }
            } 

             [HttpGet("server-error")]
            public ActionResult<string> GetServerError()
            {
                var thing = _context.Users.Find(-1);
                var thingToReturn = thing.ToString();
                return thingToReturn;
            } 

            [HttpGet("bad-request")]
            public ActionResult<string> GetBadRequest()
            {
                return BadRequest("Bad Request");
            } 

    }
}