import Header from "../components/Header";

type DashboardLayoutProps = {
  children: React.ReactNode,
};


function BaseLayout({ children }: DashboardLayoutProps) {
  // const [ isOpen, setIsOpen ] = useRecoilState(openModel)
  return (
    <>
      <Header />
      <main>{ children }</main>
    </>
  )
}

export default BaseLayout