using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SpaceWar.StartUp))]
namespace SpaceWar
{
    public class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}