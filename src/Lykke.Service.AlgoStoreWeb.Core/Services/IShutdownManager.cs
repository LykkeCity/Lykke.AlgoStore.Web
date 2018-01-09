using System.Threading.Tasks;

namespace Lykke.Service.AlgoStoreWeb.Core.Services
{
    public interface IShutdownManager
    {
        Task StopAsync();
    }
}