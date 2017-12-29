using Lykke.Service.AlgoStoreWeb.Core.Settings.ServiceSettings;
using Lykke.Service.AlgoStoreWeb.Core.Settings.SlackNotifications;

namespace Lykke.Service.AlgoStoreWeb.Core.Settings
{
    public class AppSettings
    {
        public AlgoStoreWebSettings AlgoStoreWebApi { get; set; }
        public SlackNotificationsSettings SlackNotifications { get; set; }
    }
}
