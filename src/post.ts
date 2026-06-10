import {getInput, info, error, warning, notice} from '@actions/core'
import type {AnnotationProperties} from '@actions/core'
import {existsSync, readFileSync} from 'fs'

const annotate: boolean = getInput('annotate') !== 'false'

const file = '.hemttout/ci_annotations.txt'

function run(): void {
  if (!annotate) return
  info('Annotating build.')
  if (!existsSync(file)) {
    info('No annotations file found.')
    return
  }
  const data = readFileSync(file, 'utf8')
  const lines = data.split('\n')
  const annotations = lines.filter(line => line.length > 0).map(parseAnnotation)
  info(`Found ${annotations.length} annotations.`)
  for (const annotation of annotations) {
    switch (annotation.level) {
      case 'error':
        error(annotation.message, annotationParams(annotation))
        break
      case 'warning':
        warning(annotation.message, annotationParams(annotation))
        break
      default:
        notice(annotation.message, annotationParams(annotation))
        break
    }
  }
}

interface Annotation {
  start_line: number
  end_line: number
  start_column: number
  end_column: number
  level: string
  title: string
  message: string
  path: string
}

function parseAnnotation(line: string): Annotation {
  const parts = line.split('||')
  return {
    start_line: parseInt(parts[0]),
    end_line: parseInt(parts[1]),
    start_column: parseInt(parts[2]),
    end_column: parseInt(parts[3]),
    level: parts[4],
    title: parts[5],
    message: parts[6],
    path: parts[7]
  }
}

function annotationParams(annotation: Annotation): AnnotationProperties {
  const props: AnnotationProperties = {
    file: annotation.path,
    title: annotation.title,
    startLine: annotation.start_line,
    endLine: annotation.end_line
  }
  if (annotation.start_line === annotation.end_line) {
    props.startColumn = annotation.start_column
    props.endColumn = annotation.end_column
  }
  return props
}

run()
