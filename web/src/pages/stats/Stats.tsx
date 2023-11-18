import {Outlet} from '@solidjs/router'
import ContentContainer from '../../layout/ContentContainer'
import InnerContainer from '../../layout/InnerContainer'
import classes from './stats.module.css'

export default function Stats() {
  return (
    <InnerContainer>
      <ContentContainer>
        <main class={classes.box}></main>
      </ContentContainer>
      <Outlet />
    </InnerContainer>
  )
}
