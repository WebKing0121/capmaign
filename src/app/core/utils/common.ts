import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SortDirection } from '@swimlane/ngx-datatable';
import { OrderByDirection } from '@app-models/pagination';

export async function wait(time: number): Promise<void> {
  await of(0).pipe(delay(time)).toPromise();
}

export function orderByDirectionOf(dir: SortDirection): OrderByDirection {
  return dir === SortDirection.asc ? OrderByDirection.ASC : OrderByDirection.DESC;
}

export function tableSortDirectionOf(orderByDir: OrderByDirection): SortDirection {
  return orderByDir === OrderByDirection.ASC ? SortDirection.asc : SortDirection.desc;
}
