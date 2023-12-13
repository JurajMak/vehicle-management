import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { FixMeLater } from '../../types';
import { makeStore } from '../../stores/MakeStore';
import { errorNotification } from '../../components/Notifications';
import { successCreation } from '../../components/Notifications';
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
          placeholder: 'Add abbreviation ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'country',
          label: 'Country',
          placeholder: 'Add country of origin ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Add Brand Image',
          placeholder: 'Add abbreviation for vehicle brand',
          rules: 'required',
          value: '',
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form: FixMeLater) => {
        const { name, abrv, image, country } = form.values();
        const url = await Vehicle.Make.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });
        const data = {
          name: name,
          abrv: abrv,
          country: country,
          image: url,
        };

        await Vehicle.Make.create(data);
        successCreation(`${name}`);
        form.clear();
        makeStore.cache.clear();
      },
      onError() {
        errorNotification();
      },
    };
  }
}

export const createForm = new CreateForm();
