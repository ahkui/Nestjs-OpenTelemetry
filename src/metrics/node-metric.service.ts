import { Injectable } from '@nestjs/common';
import { MetricAttributes, MetricOptions, metrics } from '@opentelemetry/api';
import { Constants } from '../Constants';
import { eventLoopLag } from './node-metric/eventLoopLag';
import { gc } from './node-metric/gc';
import { heapSizeAndUsed } from './node-metric/heapSizeAndUsed';
import { heapSpacesSizeAndUsed } from './node-metric/heapSpacesSizeAndUsed';
import { osMemoryHeap } from './node-metric/osMemoryHeap';
import { processCpuTotal } from './node-metric/processCpuTotal';
import { processMaxFileDescriptors } from './node-metric/processMaxFileDescriptors';
import { processOpenFileDescriptors } from './node-metric/processOpenFileDescriptors';
import { processResources } from './node-metric/processResources';
import { processStartTime } from './node-metric/processStartTime';
import { version } from './node-metric/version';

@Injectable()
export class NodeMetricService {
  start(
    config: {
      prefix: string;
      labels?: MetricAttributes;
    } = { prefix : '' },
  ) {
    const meter = metrics
      .getMeterProvider()
      .getMeter(Constants.OTEL_METRIC_NAME);

    eventLoopLag(meter, config);
    gc(meter, config);
    heapSizeAndUsed(meter, config);
    heapSpacesSizeAndUsed(meter, config);
    osMemoryHeap(meter, config);
    processResources(meter, config);
    processCpuTotal(meter, config);
    processMaxFileDescriptors(meter, config);
    processOpenFileDescriptors(meter, config);
    version(meter, config);
    processStartTime(meter, config);
  }
}
