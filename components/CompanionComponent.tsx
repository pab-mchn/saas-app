'use client'
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

import soundwaves from '@/constants/soundwaves.json'
import Image from 'next/image'

import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react'


enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

const CompanionComponent = ({companionId, subject, name, userName, userImage,style,topic, voice}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeacking, setIsSpeacking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(()=>{
    if(lottieRef){
      if(isSpeacking){ 
        lottieRef.current?.play()
      }
      else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeacking, lottieRef])

  useEffect(()=> {
      const onCallStart = () => setCallStatus(CallStatus.INACTIVE)

      const onCallEnd = () => setCallStatus(CallStatus.FINISHED)

      const onMessage = () => {}

      const onSpeechStart = () => setIsSpeacking(true)
      const onSpeechEnd = () => setIsSpeacking(false)

      const onError = (error: Error) => console.log(Error, error)

      vapi.on('call-start', onCallStart)
      vapi.on('call-end', onCallEnd)
      vapi.on('message', onMessage)
      vapi.on('error', onError)
      vapi.on('speech-start', onSpeechStart)
      vapi.on('speech-start', onSpeechEnd)

      return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('error', onError)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-start', onSpeechEnd)
      }

  }, [])

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted()
    vapi.setMuted(!isMuted) 
    setIsMuted(!isMuted)
  }

  const handleCall = async () => {
      setCallStatus(CallStatus.CONNECTING)

      const assistantOverrides = {
        variableValues: {
          subject,
          topic,
          style,
        },
        clientMessages: ["transcript"],
        serverMessages: [], 
      }
      // @ts-expect-error
      vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }
  return (
    <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 max-sm:flex-col'>
            <div className='companion-section'>
                <div className='companion-avatar' style={{backgroundColor: getSubjectColor(subject)}}>
                    <div 
                    className={
                      cn('absolute transition-opacity duration-1000',
                        callStatus === CallStatus.FINISHED || callStatus ===  CallStatus.INACTIVE ? 'opacity-100' :
                        'opacity-0', callStatus ===  CallStatus.CONNECTING && 'opacity-100 animated-pulse'
                      )}>
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className='max-sm:w-fit'/>
                    </div>
                    <div className={cn('absolute transition-opacity duration-100',
                      callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={soundwaves}
                            autoPlay={false}
                            className='companion-lottie'
                        />

                    </div>
                </div>
                <p className='font-bold text-2xl'>{name}</p>
            </div>
            <div className='user-section'>
              <div className='user-avatar'>
                <Image src={userImage} alt={userName} width={130} height={130} className='rounded-lg'/>
                <p className='font-bold text-2xl'>
                  {userName}
                </p>
              </div>
              <button className='btn-mic' onClick={toggleMicrophone}>
                <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
                alt='mic' width={36} height={36}/>
                <p className='max-sm:hidden'>
                  {isMuted ? 'Turn on Microphone' : 'Turn off Microphone'}
                </p>
              </button>
              <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', 
                callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', 
                callStatus === CallStatus.CONNECTING && 'animate-pulse' )} 
                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                {callStatus === CallStatus.ACTIVE ? 'End Sessions' : 
                callStatus === CallStatus.CONNECTING ? 'Connecting' : 'Start-session'}
              </button>
            </div>
        </section>
        <section className='transcript'>
          <div className='transcript-message no-scrollbar'>
                  Messages
          </div>
          <div className='transcript-fade'/>
        </section>
    </section>
  )
}

export default CompanionComponent