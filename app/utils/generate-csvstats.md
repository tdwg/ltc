## Generate CSV Stats using CSVKIT
To generate detailed stats of a csv file, run the following command after installing the repository reqiurements. 
See csvkit website for further details and additional tools available in the power cmd kit.

>cd data\ltc-set
> csvstat filename.csv > outputfile.txt
> csvstat ltc-terms-list.csv > schemas\ltc-terms-list-stats.txt
> csvstat ltc-skos-sssom-mappings.csv > schemas\ltc-skos-sssom-mappings-stats.txt
>  