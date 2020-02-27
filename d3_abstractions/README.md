# Abstraction of Data using World Map and Bubble Chart

This visualization shows two side by side visualizations showing a World Map and Bubble Charts to explain data abstraction. Find the data set used in the data folder. 


# How to Use

1. clone the repo
2. In terminal: cd D3_examples/d3_abstractions && http-server
3. go to index.html




## Domain abstraction:


The main users of this UI are Students and Researchers who are interested in understanding how countries on the extreme ends of Population Density perform on other metrics. This Visualization paints the World Map on the basis of population density and then shows how the country is performing on other areas compared to other countries in it's continent.


## Data abstraction:


2 datasets are used in this Visualization and their types are: 1) Countries.geojson which represents the World map is Geometry (Spatial). 2) Countries_processed.csv which has the rows of data where each row corresponds to one country and it's related metrics is Tabular in nature.


There are 11 data attributes shown in Visualization:
Countries - Categorical
Birth Rate - Ordered, Quantitative
Net Migration - Ordered, Quantitative
Literacy - Ordered, Quantitative
Population - Ordered, Quantitative
Area - Ordered, Quantitative
Birth Rate - Ordered, Quantitative
Infant Mortality - Ordered, Quantitative
Death Rate - Ordered, Quantitative
GDP - Ordered, Quantitative
Population Density - Ordered, Quantitative

Data Preprocessing: In the Bubble Chart, for each country and all it's metrics, averages were calculated for all the countries in the same region.


## Task abstraction:

These are the specific {action, target} pairs in this Visualization:
{Discover Population Density} for different countries. This task help users in finding countries with very high or very low Population Densities and correlate it with other metrics of that country.
{Compare Area, GDP, Infant Mortality etc} for a country to it's region's average. This task helps the user in comparing different metrics like Area, GDP etc. to it's neighbors in the region. Bigger size of bubble corresponds to higher than average values and smaller size represents lower.
{Browse Countries} based on their Area and and Population Density. This task helps users in browsing through the world map based on the Area and / or Population Density of the countries. Users can choose the densely populated countries and then see how the country is performing in other areas.
Visualization and Interaction abstraction:
The Visualizations shows in the UI are: Zoomable Map and Bubble chart. Zoomable Map shows the Countries and their Area and Population Density, Bubble Chart shows other main metrics as mentioned in above section.
Marks: Zoomable Map - Area marks ; Bubble Chart - Point marks
Channels: Zoomable Map - Color hue, Size (Area) ; Bubble Chart - Size
{Discover Population Density} is supported by the Color hue in the Zoomable Map as a higher color hue represent very high population density.
{Compare Area, GDP, Infant Mortality etc} are supported by the size of bubbles in Bubble Charts at the size is in ratio with the Average of the region. Clicking on a country in the Map leads to this task.
{Browse Countries} is supported by the Area marks on the Zoomable map as the size of each country as shown on the map is proportional to it's actual size. I choose these specific chart types as for showing countries, a Zoomable Map is very appealing as it not only shows the all the countries at once but is also helpful in reaching the smaller area countries due to it's zoomable feature. Secondly, as the focus of my Visualization is to show how population density of a country affects it's other metrics , I chose Bubble Chart to show the comparison of the country's metrics to it's neighbors in the same region. Choosing the size channel of bubbles seems like a good way of comparison.


Algorithm abstraction:

## Algorithms Used:


Projections: I am using projections to create the World map to show all the countries in the dataset. Creating projections helped in preserving the features of the map like direction, shape, area etc and map them to the paths I created for the Visualization.
Zooming: I am using the zoom function of d3 to implement zooming on my world map so that all the countries are reachable in the map. Click to zoom interaction is something users are already use to. It works by scaling on the clicked reagion and translating to restrict the user view to the zoomed area.
Size calculation: I am calculating the average of the metrics of each country's neighbors in the region to get the size of the bubbles. The size is a ratio of their metric's value to the average.
