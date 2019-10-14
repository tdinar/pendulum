export interface QuestionInterface{
  keyName?:string,
  key?: string,
  label?: string,
  defaultWord:string|number,
  required?: boolean,
  order?: number,
  controlType?: string
  type?:string,
  parentKey?:string,
  value? : string| number,
}
export class QuestionBase<T>{
  value: T;
  edit:boolean;
  parentKey:string;
  keyName:string;
  key: string;
  type:string;
  label: string;
  defaultWord:string|number;
  required: boolean;
  order: number;
  controlType: string;
  min :number;
  max:number;
  constructor(options: {
      value?: T,
      keyName?:string,
      key?: string,
      label?: string,
      defaultWord?:string|number,
      required?: boolean,
      order?: number,
      controlType?: string
      type?:string,
      parentKey?:string,
      min?:number,
      max?:number
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || 'question';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || 'input';
    this.edit = false;
    this.defaultWord = options.defaultWord
    this.keyName = options.keyName || 'question'
    this.type = options.type
    this.parentKey = options.parentKey;
    this.min = options.min || null
    this.max = options.max || null
  }
}
