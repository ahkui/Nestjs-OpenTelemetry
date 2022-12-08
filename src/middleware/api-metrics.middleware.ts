import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import * as responseTime from 'response-time';
import * as urlParser from 'url';
import { Counter, MetricAttributes, Histogram } from '@opentelemetry/api';
import { MetricService } from '../metrics/metric.service';
import { NextFunction } from 'express';
import { ServerResponse, IncomingMessage } from 'http';

@Injectable()
export class ApiMetricsMiddleware implements NestMiddleware {
  private defaultMetricAttributes: MetricAttributes;

  private httpServerRequestCount: Counter;

  private httpServerResponseCount: Counter;

  private httpServerDuration: Histogram;

  private httpServerRequestSize: Histogram;

  private httpServerResponseSize: Histogram;

  private httpServerAbortCount: Counter;

  constructor(
    @Inject(MetricService) private readonly metricService: MetricService,
  ) {
    // Semantic Convention
    this.httpServerRequestCount = this.metricService.getCounter(
      'http.server.request.count',
      {
        description: 'Total number of HTTP requests',
        unit: 'requests',
      },
    );

    this.httpServerResponseCount = this.metricService.getCounter(
      'http.server.response.count',
      {
        description: 'Total number of HTTP responses',
        unit: 'responses',
      },
    );

    this.httpServerAbortCount = this.metricService.getCounter(
      'http.server.abort.count',
      {
        description: 'Total number of data transfers aborted',
        unit: 'requests',
      },
    );

    this.httpServerDuration = this.metricService.getHistogram(
      'http.server.duration',
      {
        description: 'The duration of the inbound HTTP request',
        unit: 'ms',
      },
    );

    this.httpServerRequestSize = this.metricService.getHistogram(
      'http.server.request.size',
      {
        description: 'Size of incoming bytes',
        unit: 'By',
      },
    );

    this.httpServerResponseSize = this.metricService.getHistogram(
      'http.server.response.size',
      {
        description: 'Size of outgoing bytes',
        unit: 'By',
      },
    );
  }

  use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    responseTime((req, res, time) => {
      const { url, method } = req;
      const path = urlParser.parse(url).pathname;

      this.httpServerRequestCount.add(1, { method, path });

      const requestLength = parseInt(req.headers['content-length'], 10) || 0;
      const responseLength: number =
        parseInt(res.getHeader('Content-Length').toString(), 10) || 0;

      const status = res.statusCode || 500;
      const attributes: MetricAttributes = {
        method,
        status,
        path,
        ...this.defaultMetricAttributes,
      };

      this.httpServerRequestSize.record(requestLength, attributes);
      this.httpServerResponseSize.record(responseLength, attributes);

      this.httpServerResponseCount.add(1, attributes);
      this.httpServerDuration.record(time / 1000, attributes);

      req.on('end', () => {
        if (req.destroyed === true) {
          this.httpServerAbortCount.add(1);
        }
      });
    })(req, res, next);
  }
}
