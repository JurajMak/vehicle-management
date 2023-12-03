import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';

class CreateForm extends MobxReactForm {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }
  setup() {
    return {
      fields: [
        {
          name: 'name',
          label: 'Brand name ',
          placeholder: 'Add vehicle brand',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'abrv',
          label: 'Abbreviation',
          placeholder: 'Insert abbreviation for vehicle brand',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Add Brand Image',
          placeholder: 'Insert abbreviation for vehicle brand',
          rules: '',
          value: '',
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form: any) => {
        const { name, abrv, image } = form.values();
        const url = await Vehicle.Make.uploadFile({
          file: image,
          storageName: `uploads`,
        });
        const data = {
          name: name,
          abrv: abrv,
          image: url,
        };
        await Vehicle.Make.create(data);
        console.log(url, 'url');
        console.log(data, 'data');
        form.reset();
      },
      onError(form: any) {
        console.log(form.errors());
      },
    };
  }
}

export const createForm = new CreateForm();

// const url = await uploadFile({
//   file,
//   storageName: `uploads/${user.id}`,
// });
