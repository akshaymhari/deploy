import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpro'
})
export class SearchproPipe implements PipeTransform {

  transform(items: any, SearchDes: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (SearchDes && item.name.toLowerCase().indexOf(SearchDes.toLowerCase()) === -1) {
          return false;

        }
        return true;
      })

    }
    else {
      return items;
    }

  }

}
