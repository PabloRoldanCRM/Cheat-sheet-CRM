using Microsoft.Xrm.Sdk;
using System;

namespace [YourNameSpace]
{
    public class ServerConnection
    {
        #region propiedades

        public IPluginExecutionContext context;
        public IOrganizationServiceFactory factory;
        public IOrganizationService service;
        public ITracingService trace;
        //public XrmContext xrmContext;

        #endregion

        bool disposed = false;

        public ServerConnection(IServiceProvider serviceProvider)
        {
            context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = factory.CreateOrganizationService(context.UserId);
            trace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            //xrmContext = new XrmContext(service);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                //xrmContext.Dispose();
                context = null;
                service = null;
                trace = null;
                factory = null;
            }
            disposed = true;
        }
    }
}
