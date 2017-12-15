using System;
using Common.Log;

namespace Lykke.Service.AlgoStoreWeb.Client
{
    public class AlgoStoreWebClient : IAlgoStoreWebClient, IDisposable
    {
        private readonly ILog _log;

        public AlgoStoreWebClient(string serviceUrl, ILog log)
        {
            _log = log;
        }

        public void Dispose()
        {
            //if (_service == null)
            //    return;
            //_service.Dispose();
            //_service = null;
        }
    }
}
