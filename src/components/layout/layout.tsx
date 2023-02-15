import React, { FC } from 'react'
import Footer from './footer/footer'
import Header from './header/header'

type Props = {
    children?: React.ReactNode
  };

const Layout: FC<Props> = ({children}) => {
    return (
        <>
            <Header />
            <div style={{marginTop: '80px'}}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout