import { useMemo, useState } from 'react';
import { Chart, Series } from 'devextreme-react/chart';
import Loading from '../Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Graph() {
  const [loading, setLoading] = useState(true);
  const [ data, setData ] = useState([]);
  const navigate = useNavigate();

  useMemo (() => {
    const BACKEND_URL = 'http://localhost:4000';
      axios.get(`${BACKEND_URL}/backOffice/dashboard/main-graph`).then((res) => {
        setData(res.data.countPropertiesForEachCity);
        console.log(res.data)
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        navigate('/');
      });
  }, []);

  // if (loading) return <Loading />;
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);  
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };
    return (
      <Chart id="chart" dataSource={data}>
        <Series
          // key={d.city}
          valueField="count"
          argumentField="city"
          // name={d.city}
          type="bar"
          color={randomColor()} 
        />
      </Chart>
    );
}

export default Graph;