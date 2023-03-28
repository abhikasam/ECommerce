using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Scaffolding;
using Microsoft.EntityFrameworkCore.Scaffolding.Internal;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations.Schema;
//using Inflector;
using Humanizer;
using System.Globalization;
using Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore;

namespace ECommerce
{
    // Note: In VS2019 Preview 7, the IPluralizer interface does not get recognized at design time for use with DbScaffolding
    // The resolution is to edit ITOpsWebsite.csproj and comment out the IncludeAssets tag as shown below:

    //<PackageReference Include = "Microsoft.EntityFrameworkCore.Design" Version="3.0.0-preview7.19362.6">
    //  <PrivateAssets>all</PrivateAssets>
    //  <!-- Remove IncludeAssets to allow compiling against the assembly -->
    //  <!--<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>-->
    //</PackageReference>


    //
    // Summary:  This interface is used by ScaffoldDbContext to pluralize and singularize class and property names
    //
    public class CustomPluralizer : IPluralizer
    {
        public string Pluralize(string name)
        {

            // Can replace the call to Inflector with custom code like the below.
            //if (name.EndsWith("sses"))
            //{
            //    return name.Remove(name.Length - 2);
            //}
            //if (name.EndsWith("s"))
            //{
            //    return name.Remove(name.Length - 1);
            //}
            //return name;

            if (name.EndsWith("tatus"))  // For VPNConcentratorStatus
            {
                return name + "es";
            }


            if (name.EndsWith("lass"))  // For NSClass
            {
                return name + "es";
            }

            if (name.EndsWith("_HS"))  // For *_HS tables
            {
                return name + "es";
            }

            if (name.EndsWith("Person"))  // For UltiPerson to not get changed to UltiPeople
            {
                return name + "s";
            }


            //// If get this far, use Inflector
            //var inflector = new Inflector.Inflector(new CultureInfo("en"));
            //return inflector.Pluralize(name) ?? name;

            // If get this far, use Humanizer
            //var humanizer = new Humanizer.();
            return name.Pluralize() ?? name;
        }
        public string Singularize(string name)
        {

            // Can replace the call to Inflector with custom code like the below.
            //return name;
            if (name.EndsWith("tatus"))  // For VPNConcentratorStatus
            {
                return name;  // Inflector takes off the ending "s" and makes it "VPNConcentratorStatu", so leave as is
            }

            if (name.EndsWith("lass"))  // For NSClass
            {
                return name;  // Inflector takes off the ending "s" and makes it "NSClas", so leave as is
            }

            if (name.EndsWith("_HS"))  // For VPNConcentratorStatus
            {
                //return name.Remove(name.Length - 1);
                return name;  // Inflector takes off the ending "S" and makes it "_H", so leave as is
            }

            if (name.EndsWith("Data", System.StringComparison.OrdinalIgnoreCase))  // For RollupTransactionGLData
            {
                return name;  // Inflector changes to "Datum", so leave as is
            }


            //// If get this far, use Inflector
            //var inflector = new Inflector.Inflector(new CultureInfo("en"));
            //return inflector.Singularize(name) ?? name;

            // If get this far, use Humanizer
            //var humanizer = new Humanizer.();
            return name.Singularize() ?? name;
        }
    }

    public class CustomDesignTimeServices : IDesignTimeServices
    {
        public void ConfigureDesignTimeServices(IServiceCollection services)
        {
            services.AddSingleton<IPluralizer, CustomPluralizer>()
                .AddSingleton<ICandidateNamingService, CustomCandidateNamingService>();
        }
    }

    /// <summary>
    /// Leave table and column names unmodified.
    /// </summary>
    /// 
    public class CustomCandidateNamingService : CandidateNamingService
    {
        public override string GenerateCandidateIdentifier(DatabaseTable originalTable)
        {
            return originalTable.Name;
        }

        public override string GenerateCandidateIdentifier(DatabaseColumn originalColumn)
        {
            return originalColumn.Name;
        }

        //public override string GenerateCandidateIdentifier(DatabaseTable originalTable)
        //{
        //    var name = originalTable.Name;
        //    // If get this far, use Inflector
        //    if (name.StartsWith("tbl"))
        //        name = Regex.Replace(name, @"\Atbl", "");

        //    if (name.StartsWith("tlkp"))
        //        name = Regex.Replace(name, @"\Atlkp", "");

        //    return name;
        //}

    }
}

