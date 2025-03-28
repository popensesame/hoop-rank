import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function LeftPositionedTimeline({ setPageName }) {
  return (
    <Timeline position="left">
      <TimelineItem onClick={ () => setPageName('upload') }>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Upload</TimelineContent>
      </TimelineItem>
      <TimelineItem onClick={ () => setPageName('evaluate') }>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Evaluate</TimelineContent>
      </TimelineItem>
      <TimelineItem onClick={ () => setPageName('results') }>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Results</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}