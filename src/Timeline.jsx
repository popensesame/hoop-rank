import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function LeftPositionedTimeline({ pageName }) {
  return (
    <div className="timeline-container">
    <Timeline sx={{ fontSize: '20px'}} position="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: pageName === "upload" ? "black" : "lightgray" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ minWidth: '70px' }}>upload</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: pageName === "evaluate" ? "black" : "lightgray" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ minWidth: '70px' }}>evaluate</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: pageName === "results" ? "black" : "lightgray" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ minWidth: '70px' }}>results</TimelineContent>
      </TimelineItem>
    </Timeline>
    </div>
  );
}