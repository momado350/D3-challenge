## Background

# Starting Simple:
in this project I will be analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help users understand the findings.
the project is targeting Newspaper Editers, and Decision Makers who run a series of feature stories about the health risks facing particular demographics using information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.
The data set included is based on 2014 ACS 1-year estimates: https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml, The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

This project utilizes both html and Javascript, These will be the main files to run for analysis.
It is most likely that the project will be deployed on heroku, but if you are looking at it before that, you can eaisly run it with python server "python -m http.server" and then open it on your brower with localhost8000.


By Using the D3 techniques I will create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.This scatter plot represents each state with circle elements.

# Going Dynamic:
I am going to include more demographics and more risk factors. By Placing additional labels in the scatter plot and give them click events so that users can decide which data to display. Animate the transitions for all circles' locations as well as the range of the axes. 

# Incorporating d3-tip
While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. With Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. That why I am Adding tooltips to the circles and display each tooltip with the data that the user has selected. Additionally I will be Using the d3-tip.js plugin developed by Justin Palmer https://github.com/Caged.