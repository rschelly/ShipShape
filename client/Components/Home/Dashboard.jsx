import React, { useEffect, useState } from 'react';
import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import HeatMap from './HeatMap.jsx';
import PodsTable from './PodsTable.jsx';

function Dashboard() {
     
   const [data, setData] = useState([]);

   async function fetchData(){
    
        const result = await fetch('/graphql',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                    {
                        pods{
                          metadata{
                            name
                            namespace
                            labels{
                              app
                            }
                          }
                          status{
                            phase
                            conditions{
                              reason
                              message
                            }
                            podIP
                            startTime
                          }
                          spec{
                            nodeName
                          }
                        }
                      }
                    `
                })
            }
        )
        .then(res => res.json())
        .then((res) => {
            setData(res.data.pods);
        })
        .catch(err => console.log(err))
   };
   
   
   useEffect(
     () => fetchData()
   , [])


    return(
      
            <div className='mainDashboard'>
                <LineChart data={data} />
                <BarChart data={data} />
                <HeatMap data={data} />
                <PodsTable data={data} />
            </div>
        
    )

    
};

export default Dashboard;