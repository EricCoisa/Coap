import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../../store/rootReducer';
import { useState } from 'react';
import RichText, { type RichTextResponse } from '../richtext/richtext';
import { VideoContainer } from './video.styles';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject }
);

import type { Delta } from 'quill';

export interface VideoData {
  videoUrl: string;
  content?: Delta | string;
  videoWidth?: string;
  videoHeight?: string;
}

export interface VideoProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {}

function VideoObject(props: VideoProps) {
  const data = props.object.data as unknown as VideoData;
  const [videoUrl, setVideoUrl] = useState<string>(data.videoUrl || '');

  function handleVideoUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value;
    setVideoUrl(url);
    props.EditObject(props.object.id, { ...props.object.data, videoUrl: url });
  }

  function handleTitleChange(value: RichTextResponse) {
    props.EditObject(props.object.id, { ...props.object.data, videoTitle: value.delta });
  }

  // Detecta se está em modo impressão
  const isPrint = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('print').matches;

  // Função para extrair texto do título (Delta ou string)
  function getTitleText(title: string | import('quill').Delta): string {
    if (!title) return '';
    if (typeof title === 'string') return title;
    if (Array.isArray(title.ops)) {
      return title.ops
        .map(op => typeof op.insert === 'string' ? op.insert : '')
        .join('')
        .replace(/\n/g, ' ')
        .trim();
    }
    return '';
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <VideoContainer>
        {/* Título do vídeo */}
        <div style={{ marginBottom: '0.5rem' }}>
          <RichText
            value={data.content || ''}
            setValue={handleTitleChange}
            mode={props.mode}
            toolbar={props.mode === 'editor' ? [
              [{ header: [1, 2] }],
              ['bold', 'italic', 'underline'],
              ['clean']
            ] : false}
            defaultStyle={{ bold: true, align: 'center' }}
          />
        </div>
        {/* URL do vídeo */}
        {props.mode === 'editor' && (
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor={`video-url-${props.object.id}`}>Link do vídeo:</label>
            <input
              id={`video-url-${props.object.id}`}
              type="url"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              placeholder="https://exemplo.com/video.mp4 ou link do YouTube"
              style={{ width: '100%' }}
            />
          </div>
        )}
        {/* Renderização especial para impressão */}
        {isPrint ? (
          <div style={{ textAlign: 'center', color: '#333', fontStyle: 'italic', padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px', margin: '1rem 0' }}>
            Para acessar o vídeo{getTitleText(data.content ?? '') ? ` - ${getTitleText(data.content ?? '')}` : ''} acesse: <br />
            <span style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{videoUrl}</span>
          </div>
        ) : (
          // Player de vídeo
          videoUrl ? (
            videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
              <iframe
                title={typeof data.content === 'string' ? data.content : 'Vídeo'}
                width={data.videoWidth || '100%'}
                height={data.videoHeight || '315'}
                src={getYoutubeEmbedUrl(videoUrl)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px', width: '100%', maxWidth: '100%' }}
              />
            ) : (
              <video
                controls
                src={videoUrl}
                width={data.videoWidth || '100%'}
                height={data.videoHeight || '315'}
                style={{ borderRadius: '8px', width: '100%', maxWidth: '100%' }}
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            )
          ) : (
            <div className="video-placeholder" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
              <span style={{ fontSize: '2rem' }}>🎬</span>
              <p>Informe o link do vídeo para visualizar</p>
            </div>
          )
        )}
      </VideoContainer>
    </BaseObject>
  );
}

function getYoutubeEmbedUrl(url: string): string {
  // Extrai o ID do vídeo do YouTube e monta a URL embed
  let videoId = '';
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split(/[?&]/)[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split(/[?&]/)[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

const ConnectedVideoObject = connector(VideoObject);
export default ConnectedVideoObject;
