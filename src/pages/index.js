import React, {useContext} from 'react'
import Layout from '../layout/Layout'
import app from '../config/base';

import {GlobalDispatchContext, GlobalStateContext, AuthContext} from '../config/context';

const Index = () => {

    const state = useContext(GlobalStateContext) || {
      user: "hello world"
      }

      let currentUser;
      let test = useContext(AuthContext);
      if(test) {
          currentUser = test.currentUser;
      }
      //conditional testing.
      let logged = (<div>YOU ARE LOGGED</div>)
      let notLogged = (<div>YOU ARE NOT LOGGED</div>)
      console.log(currentUser);
      console.log(process.env.GATSBY_FIREBASE_KEY)
    return (
        <Layout>

            "hello world"
           <button onClick={() => app.auth().signOut()} >Sign out</button>
           {currentUser ? logged : notLogged}
           
           <div>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper mi, et euismod diam sodales sed. Curabitur maximus lacus a lorem malesuada, ut commodo orci ullamcorper. Curabitur efficitur pulvinar porta. Phasellus aliquet feugiat dui, ac varius sem tincidunt ac. Phasellus eu condimentum tortor, non varius nulla. Quisque elementum nisi in nunc efficitur, non gravida nibh rutrum. Aliquam congue tortor at dapibus tempor. Nulla purus dolor, cursus vel sem sit amet, luctus placerat orci. Aenean lacinia tellus urna, at auctor sapien fringilla sed. Curabitur eget fermentum arcu. Sed leo nunc, sagittis non augue ut, commodo imperdiet ipsum. Nam a iaculis ante, quis pretium mauris. Vivamus nec accumsan velit, et semper nulla. Ut semper sollicitudin orci non placerat. Sed dui libero, sollicitudin nec hendrerit non, posuere vel ipsum. Nullam posuere, nibh elementum fermentum fermentum, ante odio sollicitudin nunc, quis imperdiet enim ligula nec dolor.

Etiam ipsum eros, vestibulum in velit vel, ullamcorper posuere magna. Proin pretium suscipit finibus. Aliquam et pretium augue, et finibus nisl. Integer pretium libero dictum dapibus tristique. Proin vestibulum mauris et neque blandit pretium. Donec id interdum nulla. Aenean hendrerit pellentesque enim a vehicula.

Duis augue erat, consectetur et augue efficitur, maximus ultricies ligula. Pellentesque fermentum risus ut commodo faucibus. Proin sit amet augue id mauris auctor pharetra blandit vitae ligula. Fusce vel aliquet magna. Donec non sem lorem. Pellentesque quam enim, imperdiet et nibh eu, posuere vulputate eros. Mauris gravida lacus in nisl ornare pellentesque.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce condimentum odio ut lacus dapibus vestibulum. Sed a lacus viverra, bibendum arcu et, molestie nisl. In libero enim, bibendum non ultricies id, malesuada a dolor. Vestibulum ac lectus rhoncus, commodo eros et, faucibus nibh. Integer rhoncus arcu non massa euismod varius. Aenean dictum tellus dolor, a eleifend lorem tristique tempor. Donec dictum, leo ut hendrerit tristique, nibh eros rhoncus ipsum, id tristique orci nibh viverra tortor. Quisque aliquam imperdiet est ut posuere. Aenean non tempor dui, nec tempor purus. Ut suscipit metus arcu. Fusce et odio varius, rhoncus lectus interdum, mattis quam. Pellentesque pharetra eleifend urna, nec feugiat quam dapibus vitae.

Etiam bibendum vestibulum nibh, id tempor felis aliquam sed. Duis dui tortor, blandit sed leo scelerisque, volutpat placerat magna. Proin bibendum dui ut finibus fermentum. In quam sem, iaculis nec facilisis id, semper non purus. Suspendisse interdum justo in felis porta consequat. Pellentesque tincidunt posuere ultricies. Donec gravida orci non dolor tincidunt pellentesque.
           </div>
        </Layout>
    )
}

export default Index
