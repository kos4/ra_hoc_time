import React, {useState} from 'react';
import './App.css';

function exDateTime(Component) {
  return function (props, ...args) {
    const {date, ...newProps} = props;
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime())/60000);

    if (diff < 60) {
      newProps.date = `${diff} минут назад`;
    } else if (diff < 60 * 24) {
      newProps.date = `${Math.floor(diff / 60)} часов назад`;
    } else {
      newProps.date = `${Math.floor(diff / 60 / 24)} дней назад`;
    }

    return Component.apply(this, [newProps, ...args]);
  }
}

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function Video(props) {
  const ExDateTime = exDateTime(DateTime);
  return (
    <div className="video">
      <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <ExDateTime date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-09-15 16:01:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-09-15 18:01:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}