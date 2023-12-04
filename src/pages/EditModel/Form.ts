import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { modelStore } from '../../store/ModelStore';

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
          label: 'Edit Vehicle Model',
          placeholder: 'Edit vehicle model name',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'abrv',
          label: 'Edit abbreviation for vehicle model',
          placeholder: 'Insert abbreviation for vehicle model',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Edit Vehicle Model Image',
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
          id: modelStore.singleModelId,
        };
        await Vehicle.Model.edit(data);
      },
      onError(form: any) {
        console.log('All form errors', form.errors());
      },
    };
  }
}

export const editForm = new EditForm();
