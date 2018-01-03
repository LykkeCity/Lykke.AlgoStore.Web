﻿using System;
using Autofac;
using Common.Log;

namespace Lykke.Service.AlgoStoreWeb.Client
{
    public static class AutofacExtension
    {
        public static void RegisterAlgoStoreWebClient(this ContainerBuilder builder, string serviceUrl, ILog log)
        {
            if (builder == null) throw new ArgumentNullException(nameof(builder));
            if (serviceUrl == null) throw new ArgumentNullException(nameof(serviceUrl));
            if (log == null) throw new ArgumentNullException(nameof(log));
            if (string.IsNullOrWhiteSpace(serviceUrl))
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(serviceUrl));

            builder.RegisterType<AlgoStoreWebClient>()
                .WithParameter("serviceUrl", serviceUrl)
                .As<IAlgoStoreWebClient>()
                .SingleInstance();
        }

        public static void RegisterAlgoStoreWebClient(this ContainerBuilder builder, AlgoStoreWebServiceClientSettings settings, ILog log)
        {
            builder.RegisterAlgoStoreWebClient(settings?.ServiceUrl, log);
        }
    }
}
