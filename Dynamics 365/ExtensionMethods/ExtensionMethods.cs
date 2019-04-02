using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Discovery;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Client;
using System.Collections.Generic;

namespace [YourNameSpace]
{
    public static class ExtensionMethods
    {
        public static Guid GetGuidValue(this Entity target, string fieldName)
        {
            if (target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<Guid>(fieldName);
            return Guid.Empty;
        }

        public static Guid GetEntityReferenceId(this Entity target, string fieldName)
        {
            if (target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<EntityReference>(fieldName).Id;
            return Guid.Empty;
        }

        public static string GetEntityReferenceName(this Entity target, string fieldName)
        {
            if (target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<EntityReference>(fieldName).Name;
            return string.Empty;
        }

        public static string GetStringValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<string>(fieldName);
            return string.Empty;
        }

        public static int GetIntValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<int>(fieldName);
            return default(int);
        }

        public static int GetOptionSetValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target.Attributes[fieldName] != null)
                return target.GetAttributeValue<OptionSetValue>(fieldName).Value;

            return 0;
        }

        public static decimal GetDecimalValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<decimal>(fieldName);
            return default(decimal);
        }

        public static double GetDoubleValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<double>(fieldName);
            return default(double);
        }

        public static decimal GetMoneyValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<Money>(fieldName).Value;
            return default(decimal);
        }

        public static DateTime GetDateTimeValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<DateTime>(fieldName);

            return DateTime.MinValue;
        }

        public static bool GetBoolValue(this Entity target, string fieldName)
        {
            if (target != null && target.Contains(fieldName) && target[fieldName] != null)
                return target.GetAttributeValue<bool>(fieldName);
            return false;
        }

        public static List<Entity> ConvertToActivityParty(this List<Guid> target)
        {
            List<Entity> activitiesParty = new List<Entity>();

            foreach (var t in target)
            {
                var entity = new Entity("activityparty");
                entity["partyid"] = new EntityReference("systemuser", t);
                activitiesParty.Add(entity);
            }

            return activitiesParty;
        }

        public static List<Entity> ConvertToActivityParty(this Guid target)
        {
            List<Entity> activitiesParty = new List<Entity>();

            var entity = new Entity("activityparty");
            entity["partyid"] = new EntityReference("systemuser", target);
            activitiesParty.Add(entity);

            return activitiesParty;
        }
    }
}
