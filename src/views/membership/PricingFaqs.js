import { Row, Col } from 'reactstrap'
import AppCollapse from '@components/app-collapse'
import { useMemo } from 'react'

const PricingFaqs = ({ data }) => {

  const faqs = useMemo(() => [
    {
      title: 'Does my subscription automatically renew?',
      content: 'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.'
    },
    {
      title: 'Can I store the item on an intranet so everyone has access?',
      content: 'Tiramisu marshmallow dessert halvah bonbon cake gingerbread. Jelly beans chocolate pie powder. Dessert pudding chocolate cake bonbon bear claw cotton candy cheesecake. Biscuit fruitcake macaroon carrot cake. Chocolate cake bear claw muffin chupa chups pudding.'
    },
    {
      title: 'Am I allowed to modify the item that I purchased?',
      content: 'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan. Carrot cake marshmallow pastry. Bonbon biscuit pastry topping toffee dessert gummies. Topping apple pie pie croissant cotton candy dessert tiramisu.'
    }
  ], [])


  return (
    <div className='pricing-faq'>
      <h3 className='text-center'>FAQ's</h3>
      <p className='text-center'>Let us help answer the most common questions.</p>
      <Row className='my-2'>
        <Col className='mx-auto' sm='12' lg={{ size: 10, offset: 2 }}>
          <AppCollapse type='margin' data={faqs} titleKey='' contentKey='' accordion />
        </Col>
      </Row>
    </div>
  )
}

export default PricingFaqs
