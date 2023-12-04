import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { makeStore } from '../../store/MakeStore';

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
          placeholder: 'Insert new vehicle brand name',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'abrv',
          label: 'Insert abbreviation for vehicle brand',
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
          storageName: `uploads/${name}`,
        });
        const data = {
          name: name,
          abrv: abrv,
          image: url,
          id: makeStore.singleMakeId,
        };
        await Vehicle.Model.edit(data);
      },
      onError(form: any) {
        console.log(form.errors());
      },
    };
  }
}

export const editForm = new EditForm();
