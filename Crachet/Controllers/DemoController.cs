using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crachet.Controllers
{
    [Produces("application/json")]
    [Route("api/Demo")]
    [ApiController]
    public class DemoController : ControllerBase
    {

        [Route("add")]
        [HttpPost]
        public IActionResult AddNumbers([FromBody] AddNumbersRequest request)
        {
            var response = new AddNumbersResponse();

            if (!ModelState.IsValid)
            {
                response.IsSuccessful = false;
                return new OkObjectResult(response);
            }


            response.Sum = request.First + request.Second;
            response.IsSuccessful = true;

            return new OkObjectResult(response);
        }
    }


    public class AddNumbersRequest
    {
        public double First { get; set; }

        public double Second { get; set; }
    }

    public class AddNumbersResponse
    {
        public double Sum { get; set; }

        public bool IsSuccessful { get; set; }
    }
}
