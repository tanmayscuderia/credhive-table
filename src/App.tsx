import React, { useRef, useEffect, useState } from 'react';
import Mantitable from './components/mantitable';
import { BarChart, IData } from './components/chart';
import { useSelector } from 'react-redux';
import { AppState } from './store';
import './App.css';

const BAR_CHART_DATA: IData[] = [
  { label: "Raised Capital", value: 100 },
  { label: "Net Profit", value: 200 },
  { label: "Turnover", value: 50 }
];

const App: React.FC = () => {
  const companyData = useSelector((state: AppState) => state.companyData);
  const companyConfig = useSelector((state: AppState) => state.tableColumnConfig)
  const getSelectedRowData = useSelector((state: AppState) => state.selectedRow);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const chartData = BAR_CHART_DATA;
  const refDimensions: any = {
    containerHeight,
    containerWidth
  }
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial container height and width
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    chartData[0].value = Number(getSelectedRowData.raisedCapital.toString().slice(1).replaceAll(',', ''));
    chartData[1].value = Number(getSelectedRowData.netProfit.toString().slice(1).replaceAll(',', ''));
    chartData[2].value = Number(getSelectedRowData.turnover.toString().slice(1).replaceAll(',', ''));
  }, [getSelectedRowData]);
  
  return (
    <div>
      <h1>Company Data</h1>
      <div className='page-container'>
        <div className='chart-container' ref={containerRef}>
          <BarChart data={chartData} refDimensions={refDimensions} selectedRow={getSelectedRowData}></BarChart>
        </div>
        <div className='table-container'>
          <Mantitable tableConfig={companyConfig} tableData={companyData} ></Mantitable>
        </div>
      </div>
    </div>
  );
};

export default App;