import { Directive, input, OnDestroy, OnInit, signal } from '@angular/core';
import {
  hashKey,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';

@Directive({
  selector: '[appDataCached]',
  standalone: true,
  host: {
    '[class.list-image-checkmarkGreen]': 'hasData()',
    '[class.list-image-checkmark]': '!hasData()',
  },
})
export class DataCachedDirective implements OnDestroy, OnInit {
  queryKey = input.required<readonly unknown[]>();
  queryClient = injectQueryClient();
  unsubscribe?: () => void;
  hasData = signal(false);

  ngOnInit() {
    this.hasData.set(this.isQueryDataPresent());
    this.unsubscribe = this.queryClient.getQueryCache().subscribe(event => {
      if (
        event.query.queryHash === hashKey(this.queryKey()) &&
        (event.type === 'added' || event.type === 'removed')
      ) {
        this.hasData.set(event.type === 'added');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  private isQueryDataPresent() {
    return this.queryClient.getQueryData(this.queryKey()) !== undefined;
  }
}
