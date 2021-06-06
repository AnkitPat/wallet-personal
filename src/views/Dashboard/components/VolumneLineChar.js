import { useEffect, useState } from 'react'
import axios from 'axios'
import TinyChartStats from '@components/widgets/stats/TinyChartStats'
import { Line } from 'react-chartjs-2'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'

const VolumeBarChart = ({ tokenInfo, loader }) => {


  const data = {
    labels: ['1d', '7d', '30d'],
    datasets: [
      {
        label: '# of Votes',
        data:  tokenInfo && Object.keys(tokenInfo).length > 0 ? [tokenInfo.price.volDiff1, tokenInfo.price.volDiff7, tokenInfo.price.volDiff30] : [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)'
      }
    ]
  }

  const options1 = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
  return (tokenInfo !== null && Object.keys(tokenInfo).length > 0) ? (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Volume difference</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 min ago</CardText>
      </CardHeader>
      {(!loader && Object.keys(tokenInfo).length > 0) ? <CardBody className='statistics-body'>
        <Line data={data} options={options1} />
      </CardBody> : <></>}
    </Card>

  ) : null
}

export default VolumeBarChart
