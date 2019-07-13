export class User {
    
        /**
         * Profile data as in ApplicationUser.cs.
         */
        public FirstName: String;
        public LastName: String;
        public NationalCode:String;
        public sub:String;
        public BirthDate:Date;
        /**
         * From OpenID.
         */
        public userName: string;
    
        /**
         * Identity resource added in Config.cs.
         */
        public roles: string[];
    
    }
    