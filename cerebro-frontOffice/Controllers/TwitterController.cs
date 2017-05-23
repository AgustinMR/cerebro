using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using Tweetinvi.Models;

namespace cerebro_frontOffice.Controllers
{
    public class TwitterController : Controller
    {
        private IAuthenticationContext _authenticationContext;

        [HttpGet]
        [Route("")]
        public ActionResult TwitterAuth()
        {
            var appCreds = new ConsumerCredentials("dez0wzcNcfJLc0DySfLJDKGwL", "fof6aJ0u9yvektL4TJpXQnzyrtMEEZLZj47sdQJzItO3HiRWZn");
            var redirectURL = "https://localhost:44346/inicio";
            _authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);
            return new RedirectResult(_authenticationContext.AuthorizationURL);
        }

        public ActionResult ValidateTwitterAuth()
        {
            //var verifierCode = Request.Params.Get("oauth_verifier");
            //Request.
            // Create the user credentials
            //var userCreds = AuthFlow.CreateCredentialsFromVerifierCode(verifierCode, _authenticationContext);

            // Do whatever you want with the user now!
            //ViewBag.User = Tweetinvi.User.GetAuthenticatedUser(userCreds);
            return View();
        }
    }
}