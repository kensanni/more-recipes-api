import  AccessControl from 'accesscontrol';

const ac = new AccessControl();

const roles = () => {
  ac.grant("user")
    .readOwn("profile")
    .updateOwn("profile")
  
  ac.grant("admin")
    .extend("user")
    .readAny("profile")
  
  ac.grant("superadmin")
    .extend("user")
    .extend("admin")
    .updateAny("profile")
    .deleteAny("profile")
  
  return ac
}

export {
  roles
}
