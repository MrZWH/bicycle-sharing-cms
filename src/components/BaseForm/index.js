import React, { Component } from 'react'
import { Input, Select, Form, Buttom, Checkbox, Radio } from 'antd'
import Utils from './../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label,
          field = item.field,
          initialValue = item.initialValue || '',
          placeHolder = item.placeHolder,
          width = item.width;
        if (item.type === 'INPUT') {
          const SELECT = <FormItem label={label} key={field}>
            {getFieldDecorator(field, {
              initialValue
            })(
              <Input type="text" placeholder={placeHolder} />
            )}
          </FormItem>
        } else if (item.type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {getFieldDecorator(field, {
              initialValue
            })(
              <Select placeholder={placeHolder} style={{ width: width }}>
                {Utils.getOptionList(item.list)}
              </Select>
            )}
          </FormItem>
        } else if (item.type === 'CHECKBOX') {
          const SELECT = <FormItem label={label} key={field}>
            {getFieldDecorator(field, {
              initialValue
            })(
              <Checkbox>
                {label}
              </Checkbox>
            )}
          </FormItem>
        }

      })
    }
  }

  render() {
    return (
      <Form>

      </Form>
    )
  }
}

export default Form.create({})(FilterForm)