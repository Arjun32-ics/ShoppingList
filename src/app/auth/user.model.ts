export class User{
    constructor(
        public email : string,
        public id : string,
        private _token : string,
        private _tokenexpirationDate : Date
         ){} 

         get token(){
            if(!this._tokenexpirationDate || new Date()> this._tokenexpirationDate){
                return null;
            }
            return this._token
         }
}