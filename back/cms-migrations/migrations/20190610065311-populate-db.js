//DANGER
//
//
//USE
//
//
//WITH
//
//
//
//
//
//
//
//BLOODY
//
//
//
//
//

//
//
//CAUTION
//
//
//DANGER








module.exports = {
  async up(db) {
    var thisCount = await db.collection("changeLog").count({
      fileName: "20190610065311-populate-db.js"
    });
    console.log(thisCount);
    if (thisCount) {
      return;
    }
    var resources = await db.collection("resources").insertMany([{
        "status": "AC",
        "resourceContentReg": "^/api/articles/list-by-category(/)?",
        "description": "articles list by category",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/users/list(/)?$",
        "description": "",
        "name": "لیست یوزر ها",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/auth/login(/)?$",
        "description": "اخذ توکن",
        "name": "login",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/articles/create(/)?$",
        "description": "articles create",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/resources/create(/)?$",
        "description": "",
        "name": "ثبت دسترسی",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages(/)?$",
        "description": "",
        "name": "ساخت صفحه داینامیک",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/templates/create(/)?$",
        "description": "",
        "name": "ساخت قالب",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/list(/)?$",
        "description": "",
        "name": "لیست صفحات داینامیک",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/templates/list(/)?$",
        "description": "",
        "name": "لیست قالب ها",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/roles/list(/)?$",
        "description": "",
        "name": "لیست رول ها",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/comments/create(/)?$",
        "description": "insert comments",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/categories/create(/)?$",
        "description": "create category",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/blog(/)?$",
        "description": "get blog",
        "name": "getBlog",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/articles/[\\w-]+(/)?$",
        "description": "Get Single Article By Slug",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/articles/[\\w-]+(/)?$",
        "description": "Update Single Article By Slug",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages(/)?$",
        "description": "Update Single Page By Slug",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/modules/list(/)?$",
        "description": "get modules list",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/containers/list(/)?$",
        "description": "get containerslist",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/delete(/)?$",
        "description": "delete bu slug",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/templates/[\\w-]+(/)?$",
        "description": "Update single template by name",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/templates/[\\w-]+(/)?$",
        "description": "Get single template by name",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/templates/[\\w-]+(/)?$",
        "description": "Delete single template by name",
        "name": "",
        "method": "DELETE"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/containers/create(/)?$",
        "description": "Create a container",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/containers/[\\w-%]+(/)?$",
        "description": "Get single container by name",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/containers/[\\w-%]+(/)?$",
        "description": "Update single container by name",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/containers/[\\w-%]+(/)?$",
        "description": "Delete single container",
        "name": "",
        "method": "DELETE"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/articles/[\\w-]+(/)?$",
        "description": "Delete single article by slug",
        "name": "",
        "method": "DELETE"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/categories/list(/)?$",
        "description": "Get all categories",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/website/w/roleMappings(/)?$",
        "description": "Get all role mappings",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/website/w/roleMappings(/)?$",
        "description": "Update role mappings",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/roles/[\\w-]+(/)?$",
        "description": "Get role by id",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/resources/list(/)?$",
        "description": "Get all resources",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/roles/create(/)?$",
        "description": "Create role",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/roles/[\\w-]+(/)?$",
        "description": "Delete role",
        "name": "",
        "method": "DELETE"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/website",
        "description": "Get site settings",
        "name": "",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/auth/sign-up(/)?$",
        "description": "Sign Up",
        "name": "signUp",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/auth/verify(/)?$",
        "description": "Email verification for sign up",
        "name": "verify",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/deletePart(/)?$",
        "description": "Delete specific part from page",
        "name": "",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/editPart(/)?$",
        "description": "Update specific part in page",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/addPart(/)?$",
        "description": "Inser part to page",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/auth/forgot-password(/)?$",
        "description": "Forgot Password",
        "name": "forgotPassword",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/auth/change-password(/)?$",
        "description": "ChangePassword",
        "name": "changePassword",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/movePart(/)?$",
        "description": "Move specific part whitin page",
        "name": "",
        "method": "PUT"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/\\?slug=[\\w/-]+(/)?$",
        "description": "get specific page by slug quey param",
        "name": "getPage",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/pages/menu-list(/)?$",
        "description": "Get Menu list",
        "name": "لیست یوزر ها",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/getDirectory(/)?",
        "description": "Get directory contents",
        "name": "محتوای پوشه",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/getFile(/)?",
        "description": "Get file",
        "name": "فایل",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/download(/)?",
        "description": "Download",
        "name": "دانلود فایل",
        "method": "GET"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/upload(/)?",
        "description": "Upload",
        "name": "آپلود فایل",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/copy(/)?",
        "description": "Copy",
        "name": "کپی فایل",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/delete(/)?",
        "description": "Delete",
        "name": "حذف فایل",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/rename(/)?",
        "description": "Rename",
        "name": "تغییر نام فایل",
        "method": "POST"
      },
      {
        "status": "AC",
        "resourceContentReg": "^/api/file/create-directory(/)?",
        "description": "New Folder",
        "name": "پوشه جدید",
        "method": "POST"
      }
    ]);

    var roles = await db.collection("roles").insertMany([{
      "resources": resources.ops.filter(r => r.name === "getBlog" || r.name === "login" || r.name === "signUp" ||
          r.name === "verify" || r.name === "forgotPassword" || r.name === "changePassword" || r.name === "getPage")
        .map(r => r._id),
      "status": "AC",
      "description": "بازدید کننده عادی",
      "name": "anonymous"
    }, {
      "resources": resources.ops.map(r => r._id),
      "status": "AC",
      "description": "مدیر وب سایت",
      "name": "administrator"
    }]);

    var websites = await db.collection("websites").insertOne({
      "name": "Insurance Site",
      "url": "http://localhost:4200/",
      "title": "Insurance Site",
      "favicon": "assets/images/test1.png",
      "ip": "127.0.0.1",
      "port": 4200,
      "location": "Jupiter",
      "settings": {
        "authentication": {
          "authType": "identity",
          "authUrl": {
            "identity": {
              "base": "apiidentity.asanbime.com",
              "token": "/connect/token",
              "userInfo": "/connect/userinfo",
              "signUp": "/api/Profile",
              "port": 443,
              "isSecured": true
            }
          },
          "roleMappings": {
            "identity": [{
              "name": "admin",
              "pair": roles.ops[1]._id
            }, {
              "name": "buyer",
              "pair": roles.ops[0]._id
            }]
          },
          "email": {
            "cms": {
              "host": "mail.netap.ir",
              "port": "25",
              "user": "no-reply@netap.ir",
              "pass": "Nr!@123456"
            }
          }
        }
      }
    }); // TODO: get website from some input

    var users = await db.collection("users").insertMany([{
      "Roles": [roles.ops[1]._id, roles.ops[0]._id],
      "posts": [],
      "admin": true,
      "password": "123456",
      "email": "vahid@mgw.ir",
      "username": "v.vulkan",
      "lastName": "مهرجویی",
      "firstName": "وحید",
      // "editDate": Date.now(),
      "createDate": Date.now(),
      "website": websites.ops[0]._id,
      "isActive": true // TODO in chie asan
    }, {
      "Roles": [roles.ops[0]._id],
      "posts": [],
      "admin": false,
      "password": "anonymous",
      "email": "anonymous@anonymous.com",
      "username": "anonymous",
      "lastName": "عادی",
      "firstName": "بازدید کننده",
      // "editDate": Date.now(),
      "createDate": Date.now(),
      "website": websites.ops[0]._id,
    }]);

    await db.collection("websites").updateOne({
      "_id": websites.ops[0]._id
    }, {
      $set: {
        "admin": users.ops[0]._id
      }
    });

    await db.collection("roles").updateMany({}, {
      $set: {
        "website": websites.ops[0]._id
      }
    });

    await db.collection("modules").insertMany([{
        "description": "HtmlModule",
        "name": "HtmlModule",
        "key": "html",
        "website": websites.ops[0]._id
      },
      {
        "description": "TabdionModule",
        "name": "TabdionModule",
        "key": "tabdion",
        "website": websites.ops[0]._id
      }
    ]);

    await db.collection("containers").insertMany([{
        "name": "blue with title",
        "html": "<div class=\"blueWithTitleContainer\"><h2 data-title=\"cow\" id=\"sss\"></h2><div data-content=\"something\"></div></div>",
        "image": "",
        "title": "blue with title",
        "website": websites.ops[0]._id
      },
      {
        "name": "red with title",
        "html": "<div class=\"redWithTitleContainer\"><h2 data-title></h2><div data-content></div></div>",
        "image": "",
        "title": "red with update",
        "website": websites.ops[0]._id
      }
    ]);

    await db.collection("templates").insertOne({
      "html": "<div class=\"twoColTemplateContainer\"> <div class=\"head\" data-pane=\"headPane\"></div> <div class=\"content\" data-pane=\"contentPane\"></div> <div class=\"left\" data-pane=\"leftPane\"></div> <div class=\"clear\"></div> </div>",
      "name": "two column template",
      "image": "template2-image.jpg",
      "assets": "<style> .twoColTemplateContainer { \twidth:970px; \tmargin:0 auto; } .twoColTemplateContainer .content{ \tfloat:right; \twidth:70%; } .twoColTemplateContainer .left{ \tfloat:left; \twidth:28%; } .twoColTemplateContainer .clear{ clear:both; } </style>",
      "website": websites.ops[0]._id
    });
  },

  async down(db) {
    await db.dropDatabase();
  }
};