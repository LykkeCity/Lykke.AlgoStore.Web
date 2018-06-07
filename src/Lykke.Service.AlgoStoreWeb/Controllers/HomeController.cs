using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.SwaggerGen;
using Common.Log;
using Lykke.Service.AlgoStoreWeb.Core.Settings.ServiceSettings;

namespace Lykke.Service.AlgoStoreWeb.Controllers
{
    [Route("api/home")]
    public class HomeController : Controller
    {
        /*
         TODO :make that in a structure 
          must be array of values
          keys [] = local, dev, prod
          each to be array - apiUrl, client_id, client_secret, return_url
         */

        protected readonly ILog _log;
        private readonly AuthenticationSettings _authenticationSettings;
        public HomeController(ILog log, AuthenticationSettings authenticationSettings)
        {
            _log = log;
            _authenticationSettings = authenticationSettings;
        }

        /// <summary>
        /// Authenticate
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet("authentication")]
        [SwaggerOperation("Authenticate")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(string[]), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Authentication(String code)
        {
            String postData = "code=" + code;
            postData += "&client_id=" + _authenticationSettings.ClientId;
            postData += "&client_secret=" + _authenticationSettings.ClientSecret;
            postData += "&grant_type=" + "authorization_code";
            postData += "&redirect_uri=" + _authenticationSettings.RedirectUrl;

            using (var client = new HttpClient())
            {
                var response = await client.PostAsync
                (_authenticationSettings.ApiTokenUrl,
                    new StringContent(postData, Encoding.UTF8, "application/x-www-form-urlencoded")
                );

                var body = await response.Content.ReadAsStringAsync();
                return Ok(body);
            }
        }
    }
}
