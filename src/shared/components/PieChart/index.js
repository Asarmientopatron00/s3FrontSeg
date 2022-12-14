import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell} from 'recharts';

const CustomPieChart = ({datos, titulo, onClick}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(datos);
  }, [datos]);

  const RADIAN = Math.PI / 180;

  const COLORS = [
    '#581845',
    '#013BF1',
    '#3B3838',
    '#117329',
    '#C70039',
    '#FF0000',
    '#2E75B6',
    '#B80001',
  ];

  const calcPosition = (radius, middleAngle, cx, cy) => {
    let x,
      y = 0;
    if (middleAngle <= 90) {
      x = cx + radius * Math.cos(middleAngle * RADIAN);
      y = cy - radius * Math.sin(middleAngle * RADIAN);
      return {x, y};
    } else if (middleAngle <= 180) {
      x = cx - radius * Math.sin((middleAngle - 90) * RADIAN);
      y = cy - radius * Math.cos((middleAngle - 90) * RADIAN);
      return {x, y};
    } else if (middleAngle <= 270) {
      x = cx - radius * Math.cos((middleAngle - 180) * RADIAN);
      y = cy + radius * Math.sin((middleAngle - 180) * RADIAN);
      return {x, y};
    } else {
      x = cx + radius * Math.sin((middleAngle - 270) * RADIAN);
      y = cy + radius * Math.cos((middleAngle - 270) * RADIAN);
      return {x, y};
    }
  };

  // const CustomTooltip = ({active, payload, label}) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className='custom-tooltip'>
  //         <p className='label'>{`${payload[0].name} : ${payload[0].value}`}</p>
  //         {/* <p className="intro">{getIntroOfPage(payload[0].name)}</p> */}
  //         {/* <p className="desc">Anything you want can be displayed here.</p> */}
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = outerRadius * 0.8;
    const otherRadius = outerRadius * 1.32;
    const {x, y} = calcPosition(radius, midAngle, cx, cy);
    const {x: x2, y: y2} = calcPosition(otherRadius, midAngle, cx, cy);

    return (
      <>
        <text
          x={x}
          y={y}
          fill='white'
          textAnchor={'middle'}
          dominantBaseline='central'
          style={{fontSize: 18}}>
          {`${data[index].value}`}
        </text>
        <text
          x={x2}
          y={y2 - 8}
          fill='black'
          textAnchor={'middle'}
          dominantBaseline='central'
          style={{fontSize: 12}}>
          {`${data[index].name}`}
        </text>
        <text
          x={x2}
          y={y2 + 8}
          fill='black'
          textAnchor={'middle'}
          dominantBaseline='central'
          style={{fontSize: 12}}>
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </>
    );
  };

  return data.length > 0 ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // paddingTop: 20,
        margin: 'auto',
      }}>
      {/* <p style={{fontWeight: 'bold', fontSize: 20}}>{titulo}</p> */}
      {/* <ResponsiveContainer key={uniqid()} width={400} height={400}> */}
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          outerRadius={150}
          // innerRadius={100}
          fill='#8884d8'
          dataKey='value'
          isAnimationActive={false}
          labelLine={true}
          // legendType='circle'
          label={renderCustomizedLabel}
          // label
          onClick={(e) => {
            if (e.estado === 0) {
              onClick('0');
            } else {
              onClick(e.estado);
            }
          }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Tooltip content={<CustomTooltip />} /> */}
        {/* <Legend/> */}
      </PieChart>

      {/* </ResponsiveContainer> */}
    </div>
  ) : (
    ''
  );
};

export default CustomPieChart;
