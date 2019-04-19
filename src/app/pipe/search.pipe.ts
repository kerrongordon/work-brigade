import { Pipe, PipeTransform } from '@angular/core';
import { Beneficiary } from '../export/beneficiary';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(items: Beneficiary[], filter: string): any {
    if (!items || !filter) {
        return items;
    }

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1 ||
      item.address.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1;
    });
}

}
