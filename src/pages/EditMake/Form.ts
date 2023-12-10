import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { makeStore } from '../../store/MakeStore';
import { FixMeLater } from '../../types';

class EditForm extends MobxReactForm {
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
          label: 'Add vehicle brand',
          placeholder: 'Insert new name',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'abrv',
          label: 'Insert abbreviation ',
          placeholder: 'Insert abbreviation ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'country',
          label: 'Add brand country',
          placeholder: 'Insert abbreviation ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Add brand Image',
          rules: '',
          value: '',
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form: FixMeLater) => {
        const { name, abrv, image, country } = form.values();

        if (typeof image === 'string') {
          const data = {
            name: name,
            abrv: abrv,
            image: image,
            country: country,
            id: makeStore.singleMakeId,
          };
          await Vehicle.Make.edit(data);
        } else {
          const url = await Vehicle.Make.uploadFile({
            file: image,
            storageName: `uploads/${name}`,
          });
          const data = {
            name: name,
            abrv: abrv,
            image: url,
            country: country,
            id: makeStore.singleMakeId,
          };
          await Vehicle.Make.edit(data);
        }
        makeStore.cache.clear();
      },
      onError(form: FixMeLater) {
        console.log(form.errors());
      },
    };
  }
}

export const editForm = new EditForm();
