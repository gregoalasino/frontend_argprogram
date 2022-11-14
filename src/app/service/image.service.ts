import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `imagen/`+name)
    uploadBytes(imgRef, file)
    .then(response =>{this.getImages()})
    .catch(error => console.log(error))
  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagen')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        console.log("la url es: "+this.url);
        
      }
    })
    .catch(error => console.log(error))
  }
}

/*uploadImage(event){
    // si se eligió la imagen
    if (event.target.files.length !== 0 || event.target.files[0] != null )
     {
      // obtengo el archivo completo de la img (nombre, tipo, tamaño, etc..)
      const file = event.target.files[0];
      // obtengo solo el nombre de la imagen
      const name = file.name;
      const fileRef = this.storage.ref(name);
      // subo imagen a firestorage con el nombre y todas sus prop(tipo, tamaño, etc..)
      const task = this.storage.upload(name, file);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.selectedFile = url;
        });
      })
    )
    .subscribe();
    }
  }*/
