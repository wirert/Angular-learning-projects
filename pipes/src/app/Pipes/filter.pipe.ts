import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../Models/Student";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(list: Student[], filterBy: string) {
    if (
      filterBy.toLowerCase() === "all" ||
      filterBy === "" ||
      list.length === 0
    ) {
      return list;
    }

    return list.filter(
      (s) => s.gender.toLowerCase() === filterBy.toLowerCase()
    );
  }
}
