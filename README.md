## Starting the application
Open index.html in your browser.

## Using application
Click on light bulb marker to see info on lit buildings
Click on cable lines to see info on cables.

## Adding of new data
If new Owners are added to the cable data.
Add the owner to the colorKey object.
It is currently set to display a cable w/ no defined Owner in green.

## About app and considerations
### Declustering
Since many of the lit buildings are together, looking into a declustering libary would be a good next step.

### Pure JavaScript vs. React or SPA library
In starting this app I initially looked into using with React.
I came to the conclusion that a SPA was not necessary for this app at this point.

### Precision on cable length:
The meters length of a cable currently shows to all decimal places.
Depending on precision necessary, this could be rounded to specific decimal places.