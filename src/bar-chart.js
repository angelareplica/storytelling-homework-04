import * as d3 from 'd3'

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 20
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#bar-chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width]).padding(0.05)

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
  .range([height, 0])

d3.csv(require('./countries.csv')).then(ready)

function ready(datapoints) {
  // Sort the countries from low to high
  datapoints = datapoints.sort((a, b) => {
    return a.life_expectancy - b.life_expectancy
  })
  d3.select('#asia').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'Asia') {
        return '#c16686'
      } else {
        return '#363f63'
      }
    })
  })

  d3.select('#africa').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'Africa') {
        return '#c16686'
      } else {
        return '#363f63'
      }
    })
  })

  d3.select('#north-america').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'N. America') {
        return '#c16686'
      } else {
        return '#363f63'
      }
    })
  })

  d3.select('#low-gdp').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.gdp_per_capita < 4000) {
        return '#c16686'
      } else {
        return '#363f63'
      }
    })
  })

  d3.select('#continent').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'Asia') {
        return '#c16686'
      } 
      else if (d.continent === 'Africa') {
        return '#7b5281'
      }
      else if (d.continent === 'Europe') {
        return '#363f63'
      }
      else if (d.continent === 'N. America') {
        return '#f68778'
      }
      else if (d.continent === 'S. America') {
        return '#ffbb66'
      }
      else if (d.continent === 'Oceania') {
        return '#f9f871'
      }
      else if (d.continent === 'Antarctica') {
        return '#9bde7e'
      }
      else {
        return 'gray'
      }
    })
  })

  d3.select('#reset').on('click', function() {
    svg.selectAll('rect').attr('fill', '#363f63')
    })

  // And set up the domain of the xPositionScale
  // using the read-in data
  const countries = datapoints.map(d => d.country)
  xPositionScale.domain(countries)

  var heightScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, height])

  /* Add your rectangles here */

  svg
  .selectAll('rect')
  .data(datapoints)
  .enter()
  .append('rect')
  .attr('height', function (d) {
    return heightScale(d.life_expectancy)
  })
  .attr('fill', '#363f63')
  .attr('width', xPositionScale.bandwidth())
  .attr('y', function (d) {
    return height - heightScale(d.life_expectancy)
  })
  .attr('x', function (d) {
    return xPositionScale(d.country)
  })
  .attr('class', d => {
    return d.continent.toLowerCase()
  })

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()

  d3.select('.y-axis .domain').remove()
}
